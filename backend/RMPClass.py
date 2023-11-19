import requests
from bs4 import BeautifulSoup
from urllib.parse import quote_plus

class RateMyProfScraper:
    def __init__(self,schoolid):
        self.UniversityId = schoolid
        self.indexnumber = False
    
    def getProfessor(self, name):

        url = f"https://www.ratemyprofessors.com/search/professors/{self.UniversityId}?q={quote_plus(name)}"
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')

        relay = soup.find('script', string=lambda text: text and '__RELAY_STORE__' in text)
        
        if relay:
            relay_cont = relay.string
            
            if "\"didFallback\":true" in relay_cont:
                return 0
            
            start = relay_cont.find("legacyId") + 10
            legacyId = relay_cont[ start : relay_cont.find("avgRating") - 2]

            return legacyId
            # return data.get('VGVhY2hlci0yODMxMDYw').get('legacyId')

            # profInfo = parsed.find('script', text=lambda text: '__RELAY_STORE__' in text)

            # if profInfo:
            #     content = profInfo.string
            #     print(content)
            # else:
            #     print("Professor not found")


tamu = RateMyProfScraper(1003)
print(tamu.getProfessor("yoo w"))