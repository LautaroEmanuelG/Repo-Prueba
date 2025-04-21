<?php
require_once(__DIR__ . '/crestcurrent.php');

function userCurrent()
{
    $response = CRestCurrent::call('user.current');
    return $response['result'];
}
$userCurrent = userCurrent();
$departments = $userCurrent['UF_DEPARTMENT'];
$userName = $userCurrent['NAME'] . ' ' . $userCurrent['LAST_NAME'];
?>
<?php echo $userName;echo $userCurrent ?>
<?php include('../out/index.html'); ?>