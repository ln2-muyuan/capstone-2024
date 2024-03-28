import os
import base64
import shutil

def convert_to_base64(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
        base64_data = base64.b64encode(data).decode('utf-8')
    return base64_data

def main():
    folder_path = '../../Server/tempdata/original-png'
    base64_folder = '../../Server/tempdata/original-base64'

    os.makedirs(base64_folder, exist_ok=True)

    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith('.png'):
                file_path = os.path.join(root, file_name)
                base64_data = convert_to_base64(file_path)

                # 构建输出文件路径
                relative_dir = os.path.relpath(root, folder_path)
                base64_dir = os.path.join(base64_folder, relative_dir)
                os.makedirs(base64_dir, exist_ok=True)
                base64_file_path = os.path.join(base64_dir, f'{file_name}.txt')

                with open(base64_file_path, 'w') as output_file:
                    output_file.write(base64_data)
                # print(f'Converted {file_path} to Base64: {base64_file_path}')

if __name__ == '__main__':
    main()