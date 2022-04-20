# useAxiosPost

useAxiosPost a React custom hook fully tested that returns a tuple of status, a function to make a post request, and axios error response, and the success response.

### **install**

```bash
npm i @sjblurton/use-axios-post

yarn add @sjblurton/use-axios-post
```

### Import useAxiosPost

```bash
import useAxiosPost from "@sjblurton/use-axios-post";
```

### **To call the hook...**

```bash
const [status, setPost, error, response] = useAxiosPost();
```

### **status**

returns a string of 'idle', 'pending', 'error', or 'success'

### **setPost**

takes one object with two values, the url and a string, and the JSON body of the post.

```bash
setPost({
            url: "https://reqreres.in/api/",
            post: {
              name: "morpheus",
              job: "leader",
            },
          })
```

### **error**

returns an AxiosError response or undefined if no error

### **response**

returns an AxiosResponse or undefined if not responded.

### **Links**

GitHub: https://github.com/sjblurton/use-axios-post
<br/>
NPM: https://www.npmjs.com/package/@sjblurton/use-axios-post
