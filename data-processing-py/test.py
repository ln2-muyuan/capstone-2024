import pickle
import matplotlib.pyplot as plt

import numpy as np
import cv2

with open('img_pred_pair.pkl', 'rb') as f:
    data = pickle.load(f)





image_data = data['image']
prediction_data = data['prediction']
path_image_data = data['path_image']
resolution_data = data['resolution']

image_index = 11



image = image_data[image_index]
prediction = prediction_data[image_index]
mask = np.zeros_like(image)

mask[prediction == 1] = 255  # 将预测为正类的区域设置为白色

# 将单通道掩模转换为三通道（如果图像是三通道）
if len(image.shape) == 3:
    mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)

# 将掩模应用于图像
result = cv2.bitwise_and(image, mask)

# 显示结果
cv2.imshow("Result", result)
cv2.waitKey(0)
cv2.destroyAllWindows()

# print("image_data: ")
# print(image_data)
# print("------------------")
# print("prediction_data: ")
# print(prediction_data)
# print("------------------")

# print("------------------")
# print("resolution_data: ")
# print(resolution_data)