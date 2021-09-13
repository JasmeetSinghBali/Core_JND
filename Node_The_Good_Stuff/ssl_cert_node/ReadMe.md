# SSL Certificate generation for backend server in Node

**refer-https://www.openssl.org/**

- [x] download and install a/c to OS or Install git bash and open your git bash and type below command.

                # in terminal
                openssl

- [x] steps to generate ssl certificate
    - [x] generate private key
    - [x] create a CSR(certificate signing request) using private key
    - [x] generate the SSL certification from CSR
            
            # step-1(key.pem)
            # navigate to your project make a cert folder and cd inside of it
            # generating private key and saving it in key.pem file
            openssl genrsa -out key.pem 


            # step-2(csr.pem)
            # certificate signing request with the private key generated in step-1
            openssl req -new -key key.pem -out csr.pem

            # answer at least few of the questions like
            Country name
            Organization name
            Email Address

            # rest skip by pressing enter

            # step-3(cert.pem)
            # create ssl certificate with signkey and csr request
            # x509 is the standard format of defining a ssl certificate, -days specified for # the days the certificate will be valid
            openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
            
- [x] **so cert.pem is the file we will use in the backend the csr.pem file can be deleted as we dont need it anymore**

- [x] **place the cert.pem and key.pem inside cert directory**

            npm run dev

            # go to https://localhost:5000

- [x] **though the page will say not secure that is bcz we ourself signed the certificate as authority to provide a browser recoganized ssl certificate one must use LETSENCRYPT CSR AUTHORITY to generate the csr.pem**