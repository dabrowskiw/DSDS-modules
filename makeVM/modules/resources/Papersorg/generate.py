from datetime import datetime
import time
import os
import random
import csv
import uuid
import math

class ArrayStream:
    def __init__(self, array):
        self.values = array
        self.length = len(array)
        self.index = 0
    
    def remaining(self):
        return self.length - self.index
    
    def next(self):
        v = self.values[self.index]
        self.index += 1
        return v

def dump_dates():
    today = int(time.time())
    backup_interval_in_days = random.randint(14, 21) * 86400
    day_offset = random.randint(-30, 30) * 86400
    current_date = today + day_offset - 47304000
    dates = []

    while current_date < today:
        d = time.gmtime(current_date)
        dates.append(time.strftime("%Y-%m-%d", d))
        current_date += backup_interval_in_days
    return dates

def read_csv(filepath):
    entries = []

    with open(filepath, 'rb') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=';')

        for row in spamreader:
            entries.append(row)
    
    random.shuffle(entries)
    return entries

def make_uuid():
    u = str(uuid.uuid4())
    return u.replace("-", "")[:16]

def refine_password(pwd):
    u = make_uuid()[:8]
    refined = list(pwd + u)
    random.shuffle(refined)
    return "".join(refined)

def add_to_database(stream, crackables, batch_size):
    sql = ["USE papersorg;"]

    for i in range(batch_size):
        user_uuid = make_uuid()
        (user, admin, paper, crackable) = stream.next()
        pwd = crackables.next()[0] if crackable else refine_password(user[2])
        sql.append("INSERT INTO `users` VALUES ('{user_uuid}', '{email}', '{name}', {admin}, MD5('{pwd}'));".format(user_uuid=user_uuid,email=user[1],name=user[0],admin=admin,pwd=pwd))

        if paper != None:
            paper_uuid = make_uuid()
            cost = random.randint(10, 30) * 50
            sql.append("INSERT INTO `papers` VALUES ('{paper_uuid}', '{paper_name}', '{publisher}', {cost});".format(paper_uuid=paper_uuid,paper_name=paper[0],publisher=user_uuid, cost=cost))

    return sql

dates = dump_dates()
users = ArrayStream(read_csv("template/users.csv"))
papers = ArrayStream(read_csv("template/papers.csv"))
crackables = ArrayStream(read_csv("template/crackable.csv"))
admin_count = random.randint(3, 5)
admin_index = random.randint(1, admin_count-1)
papers_count = random.randint(10, 15)
empty_user_count = random.randint(20, 30)

entries = []

for i in range(papers_count):
    entries.append((users.next(), 0, papers.next(), 0))

for i in range(1, admin_count):
    crackable = 1 if i == admin_index else 0
    entries.append((users.next(), 1, None, crackable))

for i in range(empty_user_count):
    r = int(math.floor(empty_user_count * 0.2))
    crackable = 1 if i < r else 0
    entries.append((users.next(), 0, None, 0))

random.shuffle(entries)
entries.insert(0, (users.next(), 1, None, 0))
entry_stream = ArrayStream(entries)
users_per_batch = len(entries) / float(len(dates))
print("Total Users: {users}, UPB: {upb}".format(users=len(entries), upb=users_per_batch))
last_users_size = 0
os.mkdir("chunks")

for i in range(len(dates)):
    users_size = int(math.ceil((i + 1) * users_per_batch))
    batch_size = min(users_size - last_users_size, entry_stream.remaining())
    last_users_size = users_size
    sql = add_to_database(entry_stream, crackables, batch_size)
    
    f = open("chunks/{date}.sql".format(date=dates[i]), "w")
    f.write("\n".join(sql))
    f.close()
