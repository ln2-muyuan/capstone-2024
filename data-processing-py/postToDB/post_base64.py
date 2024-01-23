from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import requests
# uri = "mongodb+srv://ln2:sgIuaEK3l0QMd9mD@cluster0.6cg0sja.mongodb.net/?retryWrites=true&w=majority"
# client = MongoClient(uri, server_api=ServerApi('1'))
# db = client.fyp  
# collection = db.diagnoses

target_url = 'http://localhost:8800/diagnosis/addDiagnosis'


current_dir = os.getcwd()
parent_dir = os.path.dirname(current_dir)
image_folder = os.path.join(parent_dir, 'output/673415/20210119001723/T1S/T1S_base64_slice')

diagnosisID = 20210119001723
tag = 'T1S'

try:
    diagnosisImage = []

    for file_name in os.listdir(image_folder):
        image_path = os.path.join(image_folder, file_name)

        if os.path.isfile(image_path):
            with open(image_path, 'r') as f:
                base64_string = f.read()
                diagnosisImage.append(base64_string)

    data = {
        'diagnosisID': diagnosisID,
        'tag': tag,
        'diagnosisImage': diagnosisImage
    }

    response = requests.post(target_url, data=data)
    print(response)  
    print(response.text)

      
    

except Exception as e:
    print(e)

