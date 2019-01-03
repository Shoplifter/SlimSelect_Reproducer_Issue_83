<?php

$search = (array_key_exists('search', $_REQUEST)) ? strtolower($_REQUEST['search']) : '';
$result = [
    'result' => [],
];
$haystack = [
    [
        'value' => 1,
        'text' => 'CT',
        'badge' => 'AT'
    ],
    [
        'value' => 2,
        'text' => 'CT A',
        'badge' => 'HU'
    ],
    [
        'value' => 3,
        'text' => 'CT B',
        'badge' => 'CZ'
    ],
    [
        'value' => 4,
        'text' => 'CT C',
        'badge' => 'PL'
    ],
    [
        'value' => 5,
        'text' => 'CT D',
        'badge' => 'HR'
    ],
];
foreach ($haystack as $option) {
    if (strpos(strtolower($option['text']), trim($search)) !== false) {
        $result['result'][] = $option;
    }
}

header('Content-type: application/json');
echo json_encode($result);