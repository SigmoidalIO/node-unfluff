from htmldate import find_date
from lxml import html

def getDate(htmldoc):
    mytree = html.fromstring(htmldoc)

    return find_date(mytree, outputformat='%Y-%m-%d %H:%M')

if __name__ == '__main__':
    print(getDate('<html><body><span class="entry-date">July 12th, 2016</span></body></html>'))