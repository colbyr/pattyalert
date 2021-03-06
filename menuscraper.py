from urllib2 import urlopen, Request
from urllib import urlencode
from bs4 import BeautifulSoup
import datetime
import re
import urllib

SOUP = BeautifulSoup(urlopen('http://maristdining.com/dining/WeeklyMenu.htm'))
DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

def expand_meal_abbreviation(meal_abbreviation):
  d = {'brk': 'breakfast', 'lun': 'lunch', 'din': 'dinner'}
  return d[meal_abbreviation]
  
def get_day_offset(day):
  return datetime.timedelta(days = DAYS.index(day))
  
def get_week():
  span = SOUP.find('span', text=re.compile('Week'))
  week = re.search(r'Week of (.+)', span.string).group(1)
  return datetime.datetime.strptime(week, '%A %B%d, %Y')
  
def get_day(day):
  return (get_week() + get_day_offset(day)).date()
  	
def search(food):
  offerings = [] 
  for element in SOUP.find_all('span', text=food):
    parent = element.parent
    while not re.search('|'.join(day for day in DAYS), str(parent)):
      parent = parent.parent
    meal = expand_meal_abbreviation(str(element.parent.parent.parent['class'][0]))
    offerings.append({'date': str(get_day(str(parent['id']))), 'day': str(parent['id']), 'meal': meal})     
  return offerings
  
def post(offerings):
  for offering in offerings:
    data = urlencode(offering)
    request = Request('link', data)
    response = urlopen(request)
    content = response.read()

def main():
  # post(search('Chicken Patty Sandwich'))
  print(search('Chicken Patty Sandwich'))
    
if __name__ == '__main__':
  main()
