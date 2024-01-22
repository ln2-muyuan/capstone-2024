from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://ln2:sgIuaEK3l0QMd9mD@cluster0.6cg0sja.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.fyp  
collection = db.diagnoses

diagnosisID = 20210119001723

document = collection.find_one({"diagnosisID": diagnosisID})
image_data = document['diagnosisImage']
print(len(image_data))