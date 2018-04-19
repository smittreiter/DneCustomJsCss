<?php

/**
 * Class Shopware_Controllers_Backend_DneCustomJsCss
 */
class Shopware_Controllers_Backend_DneCustomJsCss extends Shopware_Controllers_Backend_ExtJs
{
    public function indexAction()
    {
        $this->View()->loadTemplate('backend/dne_custom_js_css/app.js');
    }

    public function listAction()
    {
        $id = (int) $this->Request()->getParam('id', null);

        $qb = $this->getModelManager()->getDBALQueryBuilder();
        $qb->select(
                ['*']
            )
            ->from('dne_custom_js_css')
            ->orderBy('name', 'asc');

        if ((!empty($id))) {
            $qb->where('id = :id')->setParameter('id', $id);
        }

        $data = $qb->execute()->fetchAll();

        foreach ($data as &$row) {
            $row['shopIds'] = explode(',', $row['shopIds']);
        }

        $this->View()->assign(
            ['success' => true, 'data' => $data]
        );
    }

    public function createAction()
    {
        $params = $this->Request()->getPost();

        $params['shopIds'] = implode(',', $params['shopIds']);

        $this->getModelManager()->getConnection()->insert(
            'dne_custom_js_css',
            $params
        );

        $lastInsertId = $this->getModelManager()->getConnection()->lastInsertId();

        $this->View()->assign(
            [
                'success' => true,
                'id' => $lastInsertId,
            ]
        );
    }

    public function updateAction()
    {
        $params = $this->Request()->getPost();
        $id = (int) $this->Request()->get('id');

        $params['shopIds'] = implode(',', $params['shopIds']);

        $this->getModelManager()->getConnection()->update(
            'dne_custom_js_css',
            $params,
            ['id' => $id]
        );

        $this->View()->assign(
            ['success' => true]
        );
    }

    public function deleteAction()
    {
        $id = (int) $this->Request()->get('id');

        $this->getModelManager()->getConnection()->delete(
            'dne_custom_js_css',
            ['id' => $id]
        );

        $this->View()->assign(
            ['success' => true]
        );
    }
}
