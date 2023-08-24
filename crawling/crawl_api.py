from fastapi import FastAPI
from crawl import DataCrawling

app = FastAPI()
data_crawling = DataCrawling()


# before crawl start timer
@app.on_event("startup")
def startup():
    data_crawling.timer_crawl()


@app.post("/crawl")
def crawl():
    data_crawling.crawling()
