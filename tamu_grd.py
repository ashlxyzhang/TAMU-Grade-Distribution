# imports
import urllib3
from urllib3.util.ssl_ import create_urllib3_context
from urllib.parse import urljoin
from bs4 import BeautifulSoup

import io
from PyPDF2 import PdfFileReader

url = "https://web-as.tamu.edu/gradereports/"

# create custom context
ctx = create_urllib3_context()
ctx.load_default_certs()
ctx.options |= 0x4

# create PoolManager instance to make requests
http = urllib3.PoolManager(ssl_context=ctx)

# get HTTPReponse object
read = http.request("GET", url)

# parse HTML content using beautifulsoup
html = read.data
soup = BeautifulSoup(html, "html.parser")

# find filter elements
year = soup.find("select", {"name": "ctl00$plcMain$lstGradYear"})
sem = soup.find("select", {"name": "ctl00$plcMain$lstGradTerm"})
college = soup.find("select", {"name": "ctl00$plcMain$lstGradCollege"})

# all years
year_options = year.find_all("option")
year_list = [option["value"] for option in year_options]

# all sems (spring, summer, fall)
sem_list = ["1", "2", "3"]

# all colleges
college_options = college.find_all("option")
college_list = [option["value"] for option in college_options]

base_url = "https://web-as.tamu.edu/GradeReports/PDFReports/"
pdf_urls = []

for year in year_list:
    for sem in sem_list:
        for col in college_list:
            pdf_url = f"{year}{sem}/grd{year}{sem}{col}.pdf"
            full_url = urljoin(base_url, pdf_url)
            
            response = http.request("HEAD", full_url)

            if response.status == 200 and response.headers['Content-Type'] == 'application/pdf':
                pdf_urls.append(response)

print(len(pdf_urls))