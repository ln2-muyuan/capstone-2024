import os
import nibabel as nib
import numpy as np
from PIL import Image


nii_file = '20210119001723/T1GC.nii'
nii_img = nib.load(nii_file)
data = nii_img.get_fdata()


output_dir = 'output/20210119001723/T1GC_png_slice'
os.makedirs(output_dir, exist_ok=True)


for i in range(data.shape[2]):
    slice_data = data[:, :, i]
    slice_data = np.uint8(slice_data)
    image = Image.fromarray(slice_data)
    output_file = os.path.join(output_dir, f'slice_{i}.png')
    image.save(output_file)
    print(f'Saved slice {i} as {output_file}')