<?php
class Controller {
    protected function view($view, $data = []) {
        extract($data);
        if (file_exists("../app/Views/$view.php")) {
            require_once "../app/Views/$view.php";
        } else {
            die("View $view not found.");
        }
    }

    protected function json($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
