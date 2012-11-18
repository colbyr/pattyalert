from urllib2 import urlopen
from bs4 import BeautifulSoup
import datetime
import re

SOUP = BeautifulSoup(urlopen('http://maristdining.com/dining/WeeklyMenu.htm'))
DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

def expand_meal_abbreviation(meal_abbreviation):
  if meal_abbreviation == 'lun':
    meal = "lunch"
  elif meal_abbreviation == 'brk':
    meal = "breakfast"
  else:
    meal = "dinner"
  return meal
  
def get_day_offset(day):
  return DAYS.index(day)
  
def get_week_date():
  week = SOUP.find('td', {'class': 'titlecell'}).find('span', text=re.compile('Week')).string
  week = re.search(r'Week of (.+)', week).group(1)
  week = datetime.datetime.strptime(week, '%A %B%d, %Y')
  return week
  
def get_day(day):
  return (get_week_date() + datetime.timedelta(days = get_day_offset(day))).date()
  	
def search(food):
  offerings = [] 
  for element in SOUP.find_all('span', text=food):
    parent = element.parent
    while not re.search('|'.join(day for day in DAYS), str(parent)):
      parent = parent.parent
    meal = expand_meal_abbreviation(str(element.parent.parent.parent['class'][0]))
    offerings.append({'date': str(get_day(str(parent['id']))), 'day': str(parent['id']), 'meal': meal})     
  return offerings
  
def main():
  print search('Chicken Patty Sandwich')
    
if __name__ == '__main__':
  main()
