from t2 import read_isc
import urllib.request
import unittest
 
def filereader(webs):
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
        
#def isc_file(file):
    # something to do to show the detail of the isc file



class WebgetTest(unittest.TestCase):
    @mock.patch('urllib.request.urlopen')
    def testmain(self):
        n=input('get the link of test page:')
        rightfeedback="something looks like return from webpage"     
        mock.return_value = rightfeedback
        f1=filereader(n)
        result1=isc_file(f1)
        feedback1=read_isc('user_mXFPilDRb3ukIiiv3aSs6Jhuc20wCgheXiJZBVEL.isc')

        self.assertEqual(feedback1,result1)
   



if __name__ == '__main__':
    # note: there is no main(). Only test cases here
    unittest.main(exit=False, verbosity=2)

