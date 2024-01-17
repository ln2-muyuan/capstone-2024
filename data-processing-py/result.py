import pickle
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap


with open('img_pred_pair.pkl', 'rb') as f:
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



image_index = 11
image = image_data[image_index]
prediction = prediction_data[image_index]

masked_image = np.ma.masked_array(image, mask=prediction == 0)
cmap = plt.cm.gray  
cmap.set_bad('red')

plt.imshow(masked_image, cmap=cmap)
plt.title('Masked Image')
plt.show()


# print("image_data: ")
# print(image_data)
# print("------------------")
# print("prediction_data: ")
# print(prediction_data)
# print("------------------")

# print("------------------")
# print("resolution_data: ")
# print(resolution_data)


