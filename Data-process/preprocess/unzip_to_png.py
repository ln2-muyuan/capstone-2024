import os
import sys
import zipfile
import nibabel as nib
from PIL import Image
import numpy as np
import json
import shutil


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


def unzip_all_files(folder_path, extract_paths):
    for file_name in os.listdir(folder_path):

        file_path = os.path.join(folder_path, file_name)
        # 如果已经有解压后的同名文件夹，删除之前的
        for extract_path in extract_paths:
            if os.path.exists(os.path.join(extract_path, file_name.split('.')[0])):
                shutil.rmtree(os.path.join(extract_path, file_name.split('.')[0]))

        if zipfile.is_zipfile(file_path):
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                for extract_path in extract_paths:
                    zip_ref.extractall(extract_path)
        # 删除掉input文件夹里的内容
        os.remove(folder_path + '/' + file_name)
        return file_name.split('.')[0]


def main():
    # print(os.getcwd())
    folder_path = '../../Server/tempdata/input'  
    extract_paths = ['../../Server/tempdata/original-png', '../../../MED_NNs_Mobile/uploaded_data/100sgml/polyu']
    for extract_path in extract_paths:
        os.makedirs(extract_path, exist_ok=True)

    filename = unzip_all_files(folder_path, extract_paths)
    print('解压缩完成')



    for root, dirs, files in os.walk(extract_paths[0]):
        for file_name in files:
            if file_name.endswith('.nii'):
                file_path = os.path.join(root, file_name)
                convert_to_png(file_path)
    print('转换png完成')        


    # print(filename)
    patientID = filename
    child_path = os.path.join(extract_path, filename)
    diagnosisID = os.listdir(child_path)[0]
    # print(diagnosisID)

    patient_data = {"patientID": int(patientID), "diagnosisID": int(diagnosisID)}
    with open("../../Server/tempdata/add_patient_to_user.json", "w") as f:
        json.dump(patient_data, f)
    print('写入json完成')



if __name__ == '__main__':
    main()