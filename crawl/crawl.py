import requests
from threading import Thread
from bs4 import BeautifulSoup
import csv

#Category ID form 99958673-99958741-99958819

class GlassesCrawlerThread(Thread):
    header = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
        }
    
    def __init__(self, pages, page_for_thread):
        Thread.__init__(self)
        self.pages = pages
        self.url = 'https://www.glasses.com/AjaxLoadMoreCategoryDisplay?searchPage=&searchTerm=&beginIndex={0}&categoryId=99958714&pageSize=13&catalogId=23201&langId=-1&storeId=15951&crawler=&'
        self.results = []
        self.page_for_thread = page_for_thread
    def run(self):      
        for i in range(self.pages-page_for_thread,self.pages):
            check = self.crawling(i)

    def parse(self,html):
        links = html.find_all('a', class_='item_container_pdplink')
        for li in links:
            product_name = li.find('div', class_='style-name').text.encode('utf-8')
            brand_name = li.find('div',class_='brand-name').text
            price = li.find('span', {'class': 'highlight', 'aria-label': lambda value: value and value.startswith('Current price')}).text
            price = price.replace('$ ','')
            img_url = li.find('img',class_='item-thumbnail')['data-original']
            self.results.append({
                'link':'https://www.glasses.com'+li.get('href'),
                'product_name':product_name,
                'brand_name':brand_name,
                'price':price,
                'img_url':img_url
            })
    
    def crawling(self,beginIndex):
        index = beginIndex*13
        rs = requests.get(self.url.format(index), headers=self.header)
        html = BeautifulSoup(rs.content, 'html.parser')
        self.parse(html)

if __name__ == '__main__':
    num_threads = 15
    page_for_thread = 5
    threads = []
    #pages from 0-5-10-15-20
    #first time pages = 5 -> crawl 0,4
    #second time pages = 10 -> crawl 5->9,
    for i in range(1,num_threads+1):
        thr = GlassesCrawlerThread(pages=(i*page_for_thread),page_for_thread=page_for_thread)
        threads.append(thr)
        thr.start()
    [thr.join() for thr in threads]
    filename = 'glasses.csv'

# Open file for writing
    with open(filename, 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.writer(csvfile)
        fieldnames = ['link', 'product_name', 'brand_name', 'price', 'img_url']
        # Write header row
        writer.writerow(fieldnames)

        # Write data rows
        
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        for item in threads:
            for result in item.results:
                writer.writerow(result)
        
