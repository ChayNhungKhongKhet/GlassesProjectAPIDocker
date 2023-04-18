import requests
from bs4 import BeautifulSoup
from threading import Thread
import csv
from clean_data import clean

#Pseudocode
#Each thread crawl n pages
#Each index apart 13 degree

#Create class GlassesCrawlThread(self,url,page_for_thread)
    #_______instance variable______
    #self.url = 
class GlassesCrawlerThread(Thread):
    header = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
    }
    def __init__(self, pages,category,page_for_thread):
        Thread.__init__(self)
        self.pages = pages
        self.url = 'https://www.glasses.com/AjaxLoadMoreCategoryDisplay?searchPage=&searchTerm=&beginIndex={}&categoryId='+str(category)+'&pageSize=13&catalogId=23201&langId=-1&storeId=15951&crawler=&'
        self.results = []
        self.page_for_thread = page_for_thread
    #When start thread this function is called
    #Crawl all page in a category
    def run(self):      
        for i in range(self.pages-self.page_for_thread,self.pages):
            check = self.crawling(i)

    def parse(self,html):
        links = html.find_all('a', class_='item_container_pdplink')
        for li in links:
            product_name = li.find('div', class_='style-name').text.encode('utf-8').strip()
            brand_name = li.find('div',class_='brand-name').text.strip()
            price = li.find('span', {'class': 'highlight', 'aria-label': lambda value: value and value.startswith('Current price')}).text
            price = price.replace('$ ','')
            img_url = li.find('img',class_='item-thumbnail')['data-original'].strip()
            self.results.append({
                'link':'https://www.glasses.com'+li.get('href'),
                'product_name':product_name,
                'brand_name':brand_name,
                'price':price,
                'img_url':img_url
            })
    #crawling by index page each page apart 13 degree
    def crawling(self, beginIndex):
        index = beginIndex*13
        rs = requests.get(self.url.format(index), headers=self.header)
        html = BeautifulSoup(rs.content, 'html.parser')
        self.parse(html) 


if __name__ == '__main__':
    s_category = 99958673
    e_category = 99958819
    threads = []
    page_for_thread = 10
    url = 'https://www.glasses.com/AjaxLoadMoreCategoryDisplay?searchPage=&searchTerm=&beginIndex=0&categoryId={}&pageSize=13&catalogId=23201&langId=-1&storeId=15951&crawler=&'

    num_category = int(input('How many category you want crawl\n'))
    if s_category + num_category > e_category:
        print('_______Number category out of index_______')
    else:
        for i in range(num_category):
            response = requests.get(url.format(s_category+i),headers = GlassesCrawlerThread.header)
            soup = BeautifulSoup(response.content, 'html.parser')
            try:
                total_page = int(soup.find('span',class_='paging').text.split()[3])
                print(str(total_page)+' pages of '+str(s_category+i))
            except Exception as e:
                print(e)
                continue

            #Each thread crawl one category
            #Number of thread equivalent number of category
            num_thread = total_page//page_for_thread
            odd = total_page%page_for_thread
            for j in range(1,num_thread+1):
                thr = GlassesCrawlerThread(pages=page_for_thread*j,category = (i+s_category),page_for_thread=page_for_thread)
                threads.append(thr)
                thr.start()
            #odd_page
            thread = GlassesCrawlerThread(pages=total_page,category=i+s_category,page_for_thread=odd)
            threads.append(thread)
            thread.start()
    [thr.join() for thr in threads]
    # Open file for writing
    filename = 'glasses.csv'

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
    
    clean()
#Category ID from 99958673-99958714-99958741-99958819
#Declare start_category,end_category
#Declare page_for_thread
#Defined range of pages of each category
#Loop page in rage of pages step :
    #