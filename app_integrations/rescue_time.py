import requests
from bs4 import BeautifulSoup as soup
import pandas as pd
import datetime
import numpy as np
import sys
import json
import os
import time


LOCAL = False

class RescueTimeDataHandling():
    def __init__(self):
        self.key = None
        pass

    def _get_current_date(self, minus = 0):
        return (datetime.datetime.today() - datetime.timedelta(days = minus)).strftime('%Y-%m-%d')

    def _get_key(self):
        #if LOCAL == True:
        try:
            with open("config.json") as f:
                f.seek(0)
                _ = json.load(f)
            return _['key']
        except:
            return os.getenv('RESCUE_TIME_API_KEY')
        
    def retrieve(self):
        """
        Retrieves the raw data from RescueTime.com
        """
        req = requests.get('https://www.rescuetime.com/anapi/data?key={}&by=interval&restrict_begin={}&restrict_end={}&format=csv'.format(
            str(self._get_key()), 
            str(self._get_current_date(minus = 0)),
            str(self._get_current_date(0))))
        page = soup(req.text, 'html.parser')
        df = pd.Series(str(page).splitlines()).map(lambda x: x.splitlines())
        df = pd.DataFrame(df, columns = ['value'])[1:]

        return df

    def transform(self, data):
        """
        Manipulates raw data from rescue time into a dataframe
        """
        #Sets up buckets for dataframe creation
        date = []
        time_spent = []
        people = []
        activity = []
        category = []
        productivity = []

        #Fills buckets with information
        for l in data['value']:
            if len(l[0].split(',')) < 6:
                date.append(np.nan)
                time_spent.append(np.nan)
                people.append(np.nan)
                activity.append(np.nan)
                category.append(np.nan)
                productivity.append(np.nan)
            else:
                date.append(l[0].split(',')[0])
                time_spent.append(l[0].split(',')[1])
                people.append(l[0].split(',')[2])
                activity.append(l[0].split(',')[3])
                category.append(l[0].split(',')[4])
                productivity.append(l[0].split(',')[5])


        #Sets dataframe with all info related to rescue time
        return pd.DataFrame({'Date': date, 'Time_spent':time_spent, 'People': people, 'Activity': activity, 'Category':category, 'Productivity':productivity})


#sys.stdout.write('Starting...')
print('Starting...')
handler = RescueTimeDataHandling()
raw_data = handler.retrieve()
df = handler.transform(raw_data)
df[['Time_spent', 'Productivity']] = df[['Time_spent', 'Productivity']].apply(pd.to_numeric)


df_all = df.groupby('Activity').agg(np.sum)[['Time_spent', 'Productivity']].sort_values(by = 'Time_spent', ascending = False)
df_all.to_csv('rtime_data.csv')


top_10_today = df.groupby('Activity').agg(np.sum)[['Time_spent', 'Productivity']].sort_values(by = 'Time_spent', ascending = False)[:10]
top_10_today.to_csv('rescue_time_data.csv')
print(top_10_today.iloc[0])
print("Completed... Restarting.")
#sys.stdout.write('Completed. Sleeping for 15 minutes.')
time.sleep(900)
