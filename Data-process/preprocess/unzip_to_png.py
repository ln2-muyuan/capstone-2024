import os
import zipfile
import nibabel as nib
from PIL import Image
import numpy as np


def unzip_all_files(folder_path, extract_path):
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        if zipfile.is_zipfile(file_path):
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                zip_ref.extractall(extract_path)


def convert_to_png(file_path):
    img = nib.load(file_path)
    # print(file_path)
    data = img.get_fdata()


    # 将图像数据缩放到0-255范围
    data = (data - data.min()) / (data.max() - data.min()) * 255
    data = data.astype('uint8')

    png_path = os.path.splitext(file_path)[0]
    os.makedirs(png_path, exist_ok=True)

    for i in range(data.shape[2]):
        slice_data = data[:, :, i]
        slice_data = np.uint8(slice_data)
        image = Image.fromarray(slice_data)
        output_file = os.path.join(png_path, f'slice_{i}.png')
        image.save(output_file)

    os.remove(file_path)








def main():
    # 先看下当前路径在哪里
    # print(os.getcwd())
    folder_path = '../data-process/input'  
    extract_path = '../data-process/original-png'

    # 确保导出目录存在
    os.makedirs(extract_path, exist_ok=True)

    unzip_all_files(folder_path, extract_path)
    # print('解压缩完成')

    for root, dirs, files in os.walk(extract_path):
        for file_name in files:
            if file_name.endswith('.nii'):
                file_path = os.path.join(root, file_name)
                convert_to_png(file_path)
                # print(f'Converted {file_path} to PNG')

    extract_path = '../original-png'
    patient_data = {}

    print(extract_path)



if __name__ == '__main__':
    main()