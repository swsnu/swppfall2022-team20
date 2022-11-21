import sqlite3
import requests
from bs4 import BeautifulSoup

# def scrapper(base_url):
#     conn = sqlite3.connect("db.sqlite3")
#     cursor = conn.cursor()

#     def urlToSoup(url):
#         res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
#         res.raise_for_status()
#         soup = BeautifulSoup(res.text, "lxml")
#         return soup

#     for i in range(1, 5):
#         url = base_url.format(i)
#         soup = urlToSoup(url)
#         item_info_list = soup.find_all("p", attrs={"class": "list_info"})
#         # 개별 아이템 내 사이즈 탐색
#         for item_info in item_info_list:
#             #아이템 링크, 상품명
#             item_url = "https:" + item_info.a["href"]
#             item_title = item_info.a["title"]
#             #개별 아이템 페이지 스크래핑
#             item_soup = urlToSoup(item_url)
#             # 사이즈 데이터 스크래핑
#             size_val_lst = item_soup.find_all(
#                 "td", attrs={"class": "goods_size_val"})
#             if size_val_lst == []:
#                 continue
#             # 이미지소스
#             img = item_soup.find(
#                 "img", attrs={"class": "plus_cursor"})
#             img_src = "https:" + img["src"]
#             # 브랜드명
#             brand = item_soup.find(
#                 "p", attrs={"class": "product_article_contents"}).a.string
#             # 가격
#             try:
#                 price = item_soup.find(
#                     "span", attrs={"class": "txt_price_member m_list_price"}).string
#             except:
#                 price = ""
            
#             #데이터베이스에 입력
#             sql = 'INSERT INTO clothes_clothes (style, brand, price, URL, photo) VALUES("{}", "{}", "{}", "{}", "{}")'
#             cursor.execute(sql.format(item_title, brand, price, item_url, img_src, 1))
#             item_basic_id += 1
            

def scrapper(base_url, ):
    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()
    
    for i in range(1, 5):
        url = base_url.format(i)
        res = requests.get(url)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "lxml")
        item_info_list = soup.find_all("p", attrs={"class": "list_info"})
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
            size_val_lst = res_soup.find_all(
                "td", attrs={"class": "goods_size_val"})
            if size_val_lst == []:
                continue
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
            sql = 'INSERT INTO clothes_clothes (name, style, brand, price, URL, photo, size_id) VALUES("{}", "street", "{}", "{}", "{}", "{}", 1)'
            print(sql.format(item_title, brand, price, item_url, img_src))
            cursor.execute(sql.format(item_title, brand, price, item_url, img_src))
            #item_basic_id += 1
    conn.commit()
    conn.close()

base_url = "https://www.musinsa.com/categories/item/003002?d_cat_cd=003002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color=&price1=&price2=&shoeSizeOption=&tags=%EC%99%80%EC%9D%B4%EB%93%9C%ED%8C%AC%EC%B8%A0&campaign_id=&includeKeywords=&measure="

scrapper(base_url)
