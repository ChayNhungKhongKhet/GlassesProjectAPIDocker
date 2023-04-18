import pandas as pd

def clean():
    data = pd.read_csv('./glasses.csv',encoding='utf-8')
    print('Data shape: '+str(data.shape))
    print('Data unique: '+str(len(data.link.unique())))

    data.drop_duplicates(inplace=True)
    data.to_csv('glasses.csv', index=False)
