<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("DbConnect.php");
    $objDb = new dbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case 'GET':
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($_GET['idNum'])){ //check if ID exists
                $idNum = $_GET['idNum'];
                $query = mysqli_query($conn, "SELECT idNum FROM profileBook WHERE idNum = '$idNum'");
                if(mysqli_num_rows($query) > 0){
                    $row = mysqli_fetch_assoc($query);
                    echo json_encode($row);
                } else {
                    echo json_encode(["message" => "Invalid ID"]);
                }
            }
            else if(isset($_GET['contact'])){ //verify contact number
                $contactNo = $_GET['contact'];
                $query = mysqli_query($conn, "SELECT * FROM profileBook WHERE contactNo = '$contactNo'");
                if(mysqli_num_rows($query) > 0){
                    $row = mysqli_fetch_assoc($query);
                    echo json_encode($row);
                } else {
                    echo json_encode(["message" => "Invalid number"]);
                }
            }
            else if(isset($_GET['email'])){
                $email = $_GET['email'];
                $query = mysqli_query($conn, "SELECT * FROM adminBook WHERE email = '$email'");
                if(mysqli_num_rows($query) > 0){
                    $row = mysqli_fetch_assoc($query);
                    echo json_encode($row);
                } else {
                    echo json_encode(["message" => "User not found"]);
                }
            }
            else if(isset($path[6])){ //get user profile information
                $idNum = $path[6];
                $query = mysqli_query($conn, "SELECT * FROM profileBook WHERE idNum = '$idNum'");
                if(mysqli_num_rows($query) > 0){
                    $row = mysqli_fetch_assoc($query);
                    echo json_encode($row);
                } else {
                    echo json_encode(["message" => "User not found"]);
                }
            }
            else if(isset($path[5])){ //search query
                $keyword = $path[5];
                $time = urldecode($keyword);
                //check if query is date or time first
                if(preg_match("/\d{4}-\d{2}-\d{2}/", $keyword) || preg_match("/\d{2}:\d{2}/", $time)|| preg_match("/\d{2}/", $time)){
                    $query = mysqli_query($conn, "SELECT * FROM profileBook 
                    LEFT JOIN profileTracer ON profileBook.idNum = profileTracer.idNum 
                    WHERE (profileTracer.checkIn LIKE '%".$keyword."%') OR (profileTracer.checkOut LIKE '%".$keyword."%') OR 
                    (TIME(profileTracer.checkIn) LIKE '$time:%') OR (TIME(profileTracer.checkOut) LIKE '$time:%')");
                    $data = [];
                    while($row = mysqli_fetch_array($query)){
                        $data[] = $row;
                    }
                    if(empty($data)) {
                        echo json_encode(["message" => "Non results found"]);
                    } else {
                        echo json_encode($data);
                    }
                    return;
                } else{
                    $query = mysqli_query($conn, "SELECT * FROM profileBook 
                    LEFT JOIN profileTracer ON profileBook.idNum = profileTracer.idNum 
                    WHERE (profileBook.idNum LIKE '%".$keyword."%')
                    OR (profileBook.fName LIKE '%".$keyword."%') OR (profileBook.mName LIKE '%".$keyword."%') OR (profileBook.lName LIKE '%".$keyword."%')
                    OR (profileBook.barangay LIKE '%".$keyword."%') OR (profileBook.city LIKE '%".$keyword."%') OR (profileBook.province LIKE '%".$keyword."%')
                    OR (profileTracer.checkIn LIKE '%".$keyword."%') OR (profileTracer.checkOut LIKE '%".$keyword."%')");
                    $data = [];
                    while($row = mysqli_fetch_array($query)){
                        $data[] = $row;  
                    }
                
                    if(empty($data)) {
                        echo json_encode(["message" => "No results found"]);
                    } else {
                        echo json_encode($data);
                    }
                }
            }
            else{ //get all members
                $query = mysqli_query($conn, "SELECT * FROM profileBook,profileTracer where profileBook.idNum = profileTracer.idNum ORDER BY profileTracer.checkIn DESC");
                $data = [];
                while($row = mysqli_fetch_array($query)){
                    $data[] = $row;
                }
                echo json_encode($data);
            }
        break;
        case 'POST':
            if(isset($_GET['signin'])){ //time in the user
                $data = json_decode(file_get_contents("php://input"));
                $time = $data->checkIn;
                $idNum = $data->idNum;
                $query = mysqli_query($conn, "SELECT * FROM profileTracer WHERE idNum = '$idNum' AND checkIn IS NOT NULL AND checkOut IS NULL");
                //if id exists do not insert
                if(mysqli_num_rows($query) > 0){
                    echo json_encode(["message" => "Already signed in!"]); 
                }
                else{
                    $query = mysqli_query($conn, "INSERT INTO profileTracer (idNum, checkIn) VALUES ('$idNum', '$time')");
                    if($query){
                        echo json_encode(["message" => "Data Inserted Successfully"]);
                    }
                    else{
                        echo json_encode(["message" => "Error Inserting Data"]);
                    }
                }
            }
            else if(isset($_GET['signout'])){ //time out the user
                $data = json_decode(file_get_contents("php://input"));
                $time = $data->checkOut;
                $idNum = $data->idNum;
                
                $query = mysqli_query($conn, "SELECT * FROM profileTracer WHERE idNum = '$idNum' AND checkIn IS NOT NULL");
                if(mysqli_num_rows($query) > 0){ //if not yet signed in, do not insert
                    $query = mysqli_query($conn, "UPDATE profileTracer SET checkOut='$time' WHERE idNum='$idNum' AND checkOut IS NULL");
                    if(mysqli_affected_rows($conn) > 0){
                        echo json_encode(["message" => "Data Inserted Successfully"]);
                    }
                    else{
                        echo json_encode(["message" => "Error Inserting Data"]);
                    }
                }
                else{
                    echo json_encode(["message" => "ID does not exist or not yet Signed In!"]);
                    return;
                }
            }
            else if(isset($_GET['register'])){ //register a new user
                $data = json_decode(file_get_contents("php://input"));
                $idNum = $data->idNum;
                $fName = $data->fName;
                $mName = $data->mName;
                $lName = $data->lName;
                $barangay = $data->barangay;
                $city = $data->city;
                $province = $data->province;
                $contactNo = $data->contactNo;
                $email = $data->email;
                $profileRole = $data->profileRole;

                
                $query = mysqli_query($conn, "SELECT * FROM profileBook WHERE idNum = '$idNum'");
                //if id exists do not insert
                if(mysqli_num_rows($query) > 0){
                    echo json_encode(["message" => "ID already exists"]); //change to id already exists later
                }
                else{
                    $query = mysqli_query($conn, "INSERT INTO profileBook (idNum, profileRole, fName, mName , lName ,
                                        barangay, city, province , contactNo, email) VALUES ('$idNum', '$profileRole', '$fName', 
                                        '$mName', '$lName', '$barangay', '$city', '$province', '$contactNo', '$email')");
                    if($query){
                        echo json_encode(["message" => "Data Inserted Successfully"]);
                    }
                    else{
                        echo json_encode(["message" => "Error Inserting Data"]);
                    }
                }
                    }
    }
    mysqli_close($conn);
?>