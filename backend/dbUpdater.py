import sqlite3
import requests
from bs4 import BeautifulSoup

def sizeOrganizer(soup):
    def map_text(value):
        return value.get_text()   

    size_table = soup.find(
                "table", attrs={"id": "size_table"})

    size_val_lst = size_table.find_all(
                "td", attrs={"class": "goods_size_val"})            
    
    num_of_size_val = 5
    if len(size_val_lst) % 5 != 0:
        num_of_size = len(size_val_lst) // 6
        num_of_size_val = 6
    else:
        num_of_size = len(size_val_lst) // 5
    #print(num_of_size)
    size_header_lst = size_table.find_all("th")[-num_of_size:]
    size_header_lst = list(map(map_text,size_header_lst))
    #print(size_header_lst)

    size_val_lst = list(map(map_text,size_val_lst))
    ordered_size_val_lst = []
    #print(size_val_lst)
    for i in range(0, len(size_val_lst), num_of_size_val):
        ordered_size_val_lst.append(size_val_lst[i:i + num_of_size_val])

    #print(ordered_size_val_lst)
    for i in range(num_of_size):
        ordered_size_val_lst[i].pop(3)
        ordered_size_val_lst[i].insert(0, size_header_lst[i])
    print(ordered_size_val_lst)

    return ordered_size_val_lst

def scrapper(base_url, ):
    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()
    
    for i in range(1):
        url = base_url.format(i)
        res = requests.get(url)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "lxml")
        item_info_list = soup.find_all("p", attrs={"class": "list_info"})
        item_id = 1
        item_count = 1
        # 개별 아이템 내 사이즈 탐색
        for item_info in item_info_list:
            #아이템 링크, 상품명
            item_url = "https:" + item_info.a["href"]
            item_title = item_info.a["title"]
            #개별 아이템 페이지 스크래핑
            res_item = requests.get(item_url, headers={'User-Agent': 'Mozilla/5.0'})
            res_item.raise_for_status()
            res_soup = BeautifulSoup(res_item.text, "lxml")
            # 사이즈 데이터 스크래핑
            size_data = sizeOrganizer(res_soup)
            # 이미지소스
            img = res_soup.find(
                "img", attrs={"class": "plus_cursor"})
            img_src = "https:" + img["src"]
            # 브랜드명
            brand = res_soup.find(
                "p", attrs={"class": "product_article_contents"}).a.string
            # 가격
            try:
                price = res_soup.find(
                    "span", attrs={"class": "txt_price_member m_list_price"}).string
            except:
                price = ""
            
            #데이터베이스에 입력
            sql = 'INSERT INTO clothes_clothes (name, style, brand, price, URL, photo) VALUES("{}", "street", "{}", "{}", "{}", "{}")'
            print(sql.format(item_title, brand, price, item_url, img_src))
            cursor.execute(sql.format(item_title, brand, price, item_url, img_src))
            
            for data in size_data:
                sizesql = 'INSERT INTO clothes_size (named_size, length, waist_size, thigh_size, calf_size, clothes_id) VALUES("{}", "{}", "{}", "{}", "{}", "{}")'
                sizesql = sizesql.format(data[0], data[1], data[2], data[3], data[4], item_id)
                print(sizesql)
                cursor.execute(sizesql)
            item_id += 1
            item_count += 1
            if item_count == 10:
                break

    conn.commit()
    conn.close()

base_url = "https://www.musinsa.com/categories/item/003002?d_cat_cd=003002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color=&price1=&price2=&shoeSizeOption=&tags=%EC%99%80%EC%9D%B4%EB%93%9C%ED%8C%AC%EC%B8%A0&campaign_id=&includeKeywords=&measure="

scrapper(base_url)
