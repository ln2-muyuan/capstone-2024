from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import Binary
import os

uri = "mongodb+srv://ln2:sgIuaEK3l0QMd9mD@cluster0.6cg0sja.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.fyp  
collection = db.diagnoses


current_dir = os.getcwd()
parent_dir = os.path.dirname(current_dir)
image_folder = os.path.join(parent_dir, 'output/20210119001723/T1GC_png_slice')


try:
    for file_name in os.listdir(image_folder):
        image_path = os.path.join(image_folder, file_name)

        if os.path.isfile(image_path):
            image_data = open(image_path, 'rb').read()
            buffer = Binary(image_data)

            
            collection.update_one(
                {'diagnosisID': 20210119001723, 'tag': 'T1GC'},
                {'$push': {'diagnosisImage': buffer}}
            )
            print(f'Inserted {file_name} into MongoDB')

except Exception as e:
    print(e)


