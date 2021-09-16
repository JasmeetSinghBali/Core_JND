> # Observe the dev tools (inspect>network)
**https://www.npmjs.com/package/compression**

- [x] **see the network tab and refresh the page to see size of the playload**
- [x] **keep on increasing the repeat times**

                npm i compression --save
                app.use(compression());

                

- [x] **observe the network request size and response headers with content encoding as gzip**

- [x] **we can also config the compression initializer**

                        # level of compression
                        # ranges b/w -1 to 9
                        # -1(default) & 0(no compression) while 9(best compression)
                        # recommended level = 6 or -1
                        app.use(compression({
                            level: 6
                        }))

                        # threshold limit below which no data would be compressed
                        # default threshold limit is 1kb
                        # example if 0 is given then all data is compressed from server to client
                        # for setting up threshold to be 100 kb do 100*1000 as the threshold in bytes
                        # this means any data below 100 kb should not be compressed
                        app.use(compression({
                            level: 6,
                            threshold: 100*1000
                        }));


                        # filter function
                        # that controls wheather we want compression on the request or not
                        # return false if no compression
                        # return compression.filter(req,res) if you want to compress data for the request
                        app.use(compression({
                            level: 6,
                            threshold: 100*1000,
                            filter : (req,res)=>{
                                if(req.headers['x-no-compression']){
                                    return false
                                }
                                return compression.filter(req,res)
                            }
                        }));