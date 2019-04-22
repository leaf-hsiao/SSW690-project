import re
import urllib.request
def getfile(webs):
    try:
        file=urllib.request.urlopen(webs)
    except FileNotFoundError:
        print("Can't open",webs)
    else:
        files=file.read().decode()
        filess=files.split('\n')
        filelines=list()
        for i in filess:
            filelines.append(i)
        return filelines

def find_web_break(files):
    readweb=set()
    filebreak=list()
    for i in files:
        web=re.findall(r'"?http[s]?://\w+[(.|/)\S+]*[\s|"]',i,re.I)
        if web==[]:
            continue
        else:
            for i in web:
                readweb.add(i)
    for i in readweb:
        r=i.replace('"','',3)
        try:
            file=urllib.request.urlopen(r)
        except Exception:
            filebreak.append(r)
    return filebreak

def main():
    userfile=input('please type your web:')
    web=getfile(userfile)
    numberweb=find_web_break(web)
    if len(numberweb)!=0:
        print('the number of web which is broken is {}'.format(len(numberweb)))
    else:
        print("no web broken")


if __name__=="__main__":
    main()
            
