from pymongo import MongoClient
import unittest


def mongofile():
    client=MongoClient('mongodb://localhost:27017/')
    db=client['database name']
    collection=db['table name']


    userinfor=collection.find()
    n=dict()
    m=dict()
    n[userinfor[0]['email']]=userinfor[0]['firstName']
    for i in userinfor[1:]:
        em=i['email']
        if em in n:
            raise Exception('Email is repeatedly registered') 
            m[em]=i['_id']
        else:
            n[em]=i['firstName']
    return m 
        
class MongofileTest(unittest.TestCase):
    def testmono(self):
        emai=mongofile()
        n=dict()
        self.assertEqual(emai,n)


if __name__ == '__main__':
    # note: there is no main(). Only test cases here
    unittest.main(exit=False, verbosity=2)


