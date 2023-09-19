# Shortcuts API

This API returns a custom image based on req.query.text parameter.
The returnes image displays: "The shortcut of the day is: \<your custom text\>"

An example of request can be:

http://localhost:3000/custom-image?text=Ctrl%20%2B%20F

which should return an image with the next text:

"The shortcut of the day is: Ctrl + F"
