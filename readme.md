#api
...............................................
for sign up:
http://localhost:8080/api/auth/signup
{
	"username":"username",
	"password":"password"
}
...............................................
for sign in:
http://localhost:8080/api/auth/signin
{
	"username":"username",
	"password":"password"
}
...............................................
for deleting any user:
http://localhost:8080/api/auth/delete/:username
define username in url 
...............................................
for updating user
http://localhost:8080/api/auth/updateuser
{
	"username":"username",
	"password":"password"
}
...............................................
for adding fav item
http://localhost:8080/api/auth/updatefav
{
    "username":"username",
    "like":"liked item deifne here as a single"
}
...............................................
for deleting fav item:
http://localhost:8080/api/auth/deletefav
{
    "username":"username",
    "like":"liked item deifne here as a single"
}
