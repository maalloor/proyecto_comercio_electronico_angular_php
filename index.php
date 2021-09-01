<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$servidor = "localhost"; 
$usuario = "root"; $contrasenia = ""; 
$nombreBaseDatos = "producto_asia_city";

$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


if (isset($_GET["read"])){
    $sqlProducts = mysqli_query($conexionBD,"SELECT * FROM products WHERE id=".$_GET["read"]);
    if(mysqli_num_rows($sqlProducts) > 0){
        $products = mysqli_fetch_all($sqlProducts,MYSQLI_ASSOC);
        echo json_encode($products);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}


if (isset($_GET["delete"])){
    $sqlProducts = mysqli_query($conexionBD,"DELETE FROM products WHERE id=".$_GET["delete"]);
    if($sqlProducts){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if(isset($_GET["create"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre = $data->name;
    $descripcion = $data->description;
    $precio = $data->price;
    $talla = $data->size;
    $categoria = $data->category;
    
    if(($nombre!="")&&($descripcion!="")&&($precio!="")&&($talla!="")&&($categoria!=""))
    {    
        $sqlProducts = mysqli_query($conexionBD,"INSERT INTO products(nombre,descripcion,precio,talla,categoria) VALUES('$nombre','$descripcion','$precio','$talla','$categoria') ");
        echo json_encode(["success"=>1]);
    }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["update"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id = (isset($data->id))?$data->id:$_GET["update"];
    $nombre = $data->name;
    $descripcion = $data->description;
    $precio = $data->price;
    $talla = $data->size;
    $categoria = $data->category;
    
    $sqlProducts = mysqli_query($conexionBD,"UPDATE products SET nombre = '$nombre', descripcion = '$descripcion', precio = '$precio', talla = '$talla', categoria = '$categoria' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla empleados
$sqlProducts = mysqli_query($conexionBD,"SELECT * FROM products ");
if(mysqli_num_rows($sqlProducts) > 0)
{
    $products = mysqli_fetch_all($sqlProducts,MYSQLI_ASSOC);
    echo json_encode($products);
}
else{ echo json_encode([["success"=>0]]); }
?>