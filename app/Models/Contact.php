<?php
require_once '../core/Model.php';

class Contact extends Model {
    public function getAll($order = 'name', $limit = 5, $offset = 0, $search = '') {
        $orderColumn = ($order === 'date') ? 'birthdate' : 'name';
        
        $sql = "SELECT * FROM contacts";
        if (!empty($search)) {
            $sql .= " WHERE name LIKE ? OR email LIKE ?";
        }
        $sql .= " ORDER BY $orderColumn ASC LIMIT ? OFFSET ?";

        $stmt = $this->db->prepare($sql);
        
        if (!empty($search)) {
            $searchTerm = "%$search%";
            $stmt->bind_param("ssii", $searchTerm, $searchTerm, $limit, $offset);
        } else {
            $stmt->bind_param("ii", $limit, $offset);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        
        $data = [];
        while ($row = $result->fetch_assoc()) {
            if (!empty($row['birthdate'])) {
                $row['birthdate'] = date("d/m/Y", strtotime($row['birthdate']));
            }
            $data[] = $row;
        }
        return $data;
    }

    public function countAll($search = '') {
        $sql = "SELECT COUNT(*) AS total FROM contacts";
        if (!empty($search)) {
            $sql .= " WHERE name LIKE ? OR email LIKE ?";
        }
        $stmt = $this->db->prepare($sql);
        if (!empty($search)) {
            $searchTerm = "%$search%";
            $stmt->bind_param("ss", $searchTerm, $searchTerm);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc()['total'];
    }

    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO contacts (name, email, phone, birthdate, photo) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $data['name'], $data['email'], $data['phone'], $data['birthdate'], $data['photo']);
        return $stmt->execute();
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE contacts SET name = ?, email = ?, phone = ?, birthdate = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $data['name'], $data['email'], $data['phone'], $data['birthdate'], $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM contacts WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
