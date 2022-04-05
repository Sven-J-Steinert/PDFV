#  Time   Page
#   0       1
#   1000    2
#   1500    1


x = 1500
array = [0,1,1000,2,1500,1] # to be packed in int32 values

f = open('sequence', 'wb')
for i in array:
    f.write(i.to_bytes(4, 'little'))
    print(i.to_bytes(4, 'little'))
f.close()