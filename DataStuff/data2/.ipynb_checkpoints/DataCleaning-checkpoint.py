import pandas as pd

dd = pd.read_csv('pddf_2021_04_13.csv')
dd = dd[['Generic Nm']]
dd = dd.drop_duplicates(subset = ['Generic Nm'])
dd = dd.dropna()
dd = dd.rename(columns={'Generic Nm': "FullDosage"})

new =  dd["FullDosage"].str.split(" ", n = 1, expand = True )
dd["MedName"] = new[0]
dd["Dosage/Concentration"] = new[1]

cleaned = dd
cleaned["Quantity"] = 0
cleaned.to_csv("CleanedData.csv")