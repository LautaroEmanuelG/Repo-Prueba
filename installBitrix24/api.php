<?php
require_once(__DIR__ . '/crest.php');

// Habilitar CORS para permitir solicitudes desde Next.js
header('Access-Control-Allow-Origin: https://www.services.onmtc.com');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Obtener el método y los parámetros desde la solicitud
$method = $_GET['method'] ?? null;
$params = json_decode(file_get_contents('php://input'), true) ?? [];

// Validar el método
if (!$method) {
    http_response_code(400);
    echo json_encode(['error' => 'No method specified']);
    exit;
}

// Caso especial para crm.item.list
if ($method === 'crm.item.list') {
    // Validar que entityTypeId esté presente y sea un número
    if (!isset($params['entityTypeId']) || !is_numeric($params['entityTypeId'])) {
        http_response_code(400);
        echo json_encode(['error' => 'entityTypeId is required and must be a number']);
        exit;
    }

    // Preparar los parámetros para la API de Bitrix24
    $apiParams = [
        'entityTypeId' => (int)$params['entityTypeId']
    ];

    // Añadir filtro si está presente
    if (isset($params['filter']) && is_array($params['filter'])) {
        $apiParams['filter'] = $params['filter'];
    }

    // Llamar a la API de Bitrix24 usando crest.php
    $result = CRest::call($method, $apiParams);
} else {
    // Para otros métodos, pasar los parámetros directamente
    $result = CRest::call($method, $params);
}

// Devolver el resultado como JSON
header('Content-Type: application/json');
echo json_encode($result);
