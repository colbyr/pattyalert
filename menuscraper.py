from urllib2 import urlopen
from bs4 import BeautifulSoup
import re
	
def expand_meal_abbreviation(meal_abbreviation):
  if meal_abbreviation == 'lun':
    meal = "lunch"
  elif meal_abbreviation == 'brk':
    meal = "breakfast"
  else:
    meal = "dinner"
  return meal
	
def search(food):
  soup = BeautifulSoup(urlopen('http://maristdining.com/dining/WeeklyMenu.htm'))
  offerings = [] 
  for element in soup.find_all('span', text=food):
    parent = element.parent
    while not re.search(r'monday|tuesday|wednesday|thursday|friday|saturday|sunday', str(parent)):
      parent = parent.parent
    meal = expand_meal_abbreviation(str(element.parent.parent.parent['class'][0]))
    offerings.append({'day': str(parent['id']), 'meal': meal})     
  return offerings
  
def main():
  print search('Chicken Patty Sandwich')
    
if __name__ == '__main__':
  main()
