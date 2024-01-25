import pickle
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap
from PIL import Image
import os



with open('../input/img_pred_pair.pkl', 'rb') as f:
    data = pickle.load(f)

image_data = data['image']
prediction_data = data['prediction']
path_image_data = data['path_image']
resolution_data = data['resolution']


num_image_arrays = len(image_data)
num_prediction_arrays = len(prediction_data)
num_path_image_arrays = len(path_image_data)
print("Number of arrays in image_data:", num_image_arrays)
print("Number of arrays in prediction_data:", num_prediction_arrays)
print("Number of arrays in path_image_data:", num_path_image_arrays)
print("path_image_data: ")
print(path_image_data)


output_directory = "../output/675080/20201222003169/T2Z/model"


for image_index, image in enumerate(image_data):
    prediction = prediction_data[image_index]

    masked_image = np.ma.masked_array(image, mask=prediction == 0)
    cmap = plt.cm.gray  
    cmap.set_bad('red')

    plt.axis('off') 
    plt.imshow(masked_image, cmap=cmap)

    output_filename = f"image_{image_index}.png"
    output_path = os.path.join(output_directory, output_filename)
    plt.savefig(output_path, format='png', bbox_inches='tight', pad_inches=0)

    plt.clf() 

    print(f"Saved image {image_index} as {output_filename}")

print("All images converted and saved as PNG.")





# 展示单张图片
# image_index = 11
# image = image_data[image_index]
# prediction = prediction_data[image_index]

# masked_image = np.ma.masked_array(image, mask=prediction == 0)
# cmap = plt.cm.gray  
# cmap.set_bad('red')

# plt.imshow(masked_image, cmap=cmap)
# plt.title('Masked Image')
# plt.show()






# print("image_data: ")
# print(image_data)
# print("------------------")
# print("prediction_data: ")
# print(prediction_data)
# print("------------------")

# print("------------------")
# print("resolution_data: ")
# print(resolution_data)


