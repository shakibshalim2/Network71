p='backend/app/Api.php'
lines=open(p).read().split('\n')
target_bad = "['" + "\\\\" + "\\\\" + "%', '" + "\\\\" + "\\\\" + "_']"   # ['\\\\%', '\\\\_'] as written in file
good = "['" + "\\\\" + "%', '" + "\\\\" + "_']"                            # ['\\%', '\\_']
n=0
for i,l in enumerate(lines):
    if target_bad in l:
        lines[i]=l.replace(target_bad,good); n+=1
open(p,'w').write('\n'.join(lines))
print('fixed',n)
