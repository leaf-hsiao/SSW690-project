from icalendar import Calendar
import datetime
from itertools import groupby
from operator import itemgetter


def calculate_time(event):
    end = event['DTEND'].dt
    return end


def summary(event):
    summary = str(event['SUMMARY'])
    return summary

def description(event):
   if 'DESCRIPTION'in event:
      de=str(event['DESCRIPTION'])
      if len(de)>10:
         return de
      else:
         return ''
   else:
      return ''

def get_inforisc(iscfile_name):
   file = open(iscfile_name,'rb')
   cal = Calendar.from_ical(file.read())
   return cal
   # events = [(lecturize(e), calculate_time(e)) for e in cal.walk('vevent')]

def read_isc(isc_name):
   cal1=get_inforisc(isc_name)
   events=list()
   for e in cal1.walk('vevent'):
      events.append((summary(e), calculate_time(e),description(e)))

   events1=list()
   for i in events:
      n=datetime.date.today()
      m=i[1].date()
      if n==m:
         events1.append(i)
      else:
         next
   return events1

def main():
   iscfile=input('please type the name of iscfile')
   n=read_isc(iscfile)
   return n
    #  print('the summary : {}'.format(i[0]),'the start time : {}'.format(i[1][0]),'the end time :{}'.format(i[1][1]))

