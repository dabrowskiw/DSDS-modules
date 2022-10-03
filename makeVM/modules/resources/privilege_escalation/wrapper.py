import os
import random
import logging
import datetime


from aes import call

path = "/usr/share/cat_pictures_archive/"
enctime = datetime.datetime.now().replace(microsecond=0).isoformat()
file = path + random.choice(os.listdir(path))
call(1, enctime, file)

