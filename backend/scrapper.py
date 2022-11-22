import requests
from bs4 import BeautifulSoup

def scrapper():
    url = "https://www.musinsa.com/app/goods/2028327"
    res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "lxml")
    size_table = soup.find(
                "table", attrs={"id": "size_table"})

    size_val_lst = size_table.find_all(
                "td", attrs={"class": "goods_size_val"})            
    
    num_of_size = len(size_val_lst) // 5
    print(num_of_size)
    size_header_lst = size_table.find_all("th")[-num_of_size:]
    size_header_lst = list(map(map_text,size_header_lst))
    print(size_header_lst)

    size_val_lst = list(map(map_text,size_val_lst))
    ordered_size_val_lst = []
    print(size_val_lst)
    for i in range(0, len(size_val_lst), 5):
        ordered_size_val_lst.append(size_val_lst[i:i + 5])

    print(ordered_size_val_lst)
    for i in range(num_of_size):
        ordered_size_val_lst[i].pop(3)
        ordered_size_val_lst[i].insert(0, size_header_lst[i])
    print(ordered_size_val_lst)

def map_text(value):
    return value.get_text()

scrapper()