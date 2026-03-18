<?php
require_once '../core/Controller.php';
require_once '../app/Models/Contact.php';

class ContactController extends Controller {
    private $contactModel;

    public function __construct() {
        $this->contactModel = new Contact();
    }

    public function index() {
        $this->view('contact/index');
    }

    public function list() {
        $order = $_GET['order'] ?? 'name';
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = max(1, intval($_GET['limit'] ?? 5));
        $search = $_GET['search'] ?? '';
        $offset = ($page - 1) * $limit;

        $contacts = $this->contactModel->getAll($order, $limit, $offset, $search);
        $total = $this->contactModel->countAll($search);

        $this->json(['data' => $contacts, 'total' => (int)$total]);
    }

    public function insert() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $birthdate = $_POST['birthdate'] ?? null;

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->json(['error' => 'E-mail inválido!']);
            }

            if (!preg_match("/^[0-9]{8,15}$/", $phone)) {
                $this->json(['error' => 'Telefone inválido!']);
            }

            $photo = null;
            if (!empty($_FILES["photo"]["name"])) {
                $target = "../../public/uploads/" . basename($_FILES["photo"]["name"]);
                if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target)) {
                    $photo = $_FILES["photo"]["name"];
                } else {
                    $this->json(['error' => 'Erro ao enviar foto!']);
                }
            }

            $success = $this->contactModel->create([
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'birthdate' => $birthdate,
                'photo' => $photo
            ]);

            if ($success) {
                $this->json(['success' => 'Contato cadastrado com sucesso!']);
            } else {
                $this->json(['error' => 'Erro ao cadastrar contato!']);
            }
        }
    }

    public function update() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = intval($_POST['id']);
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $birthdate = $_POST['birthdate'] ?? null;

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->json(['error' => 'E-mail inválido!']);
            }

            if (!preg_match("/^[0-9]{8,15}$/", $phone)) {
                $this->json(['error' => 'Telefone inválido!']);
            }

            $success = $this->contactModel->update($id, [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'birthdate' => $birthdate
            ]);

            if ($success) {
                $this->json(['success' => 'Contato atualizado com sucesso!']);
            } else {
                $this->json(['error' => 'Erro ao atualizar contato!']);
            }
        }
    }

    public function delete() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = intval($_POST['id']);
            $success = $this->contactModel->delete($id);

            if ($success) {
                $this->json(['success' => 'Contato removido com sucesso!']);
            } else {
                $this->json(['error' => 'Erro ao remover contato!']);
            }
        }
    }
}
