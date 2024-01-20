import SimpleITK as sitk

image = sitk.ReadImage('20210119001723/T1GC.nii')


print(type(image))
size = image.GetSize()
spacing = image.GetSpacing()
origin = image.GetOrigin()
pixel_type = image.GetPixelIDTypeAsString()

print("Image size: {}".format(size))
print("Image spacing: {}".format(spacing))
print("Image origin: {}".format(origin))
print("Image pixel type: {}".format(pixel_type))
