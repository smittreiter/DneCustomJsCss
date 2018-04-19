<?php

namespace DneCustomJsCss\Services;

use Doctrine\DBAL\Connection;
use Shopware\Components\Theme\Compressor\CompressorInterface;
use Shopware\Models\Shop\Shop;

class CompressorDecorator implements CompressorInterface
{
    /**
     * @var CompressorInterface
     */
    private $compressor;

    /**
     * @var Connection
     */
    private $connection;

    /**
     * @var Shop
     */
    private $shop;

    /**
     * CompressorDecorator constructor.
     *
     * @param CompressorInterface $compressor
     * @param Connection          $connection
     */
    public function __construct(CompressorInterface $compressor, Connection $connection)
    {
        $this->compressor = $compressor;
        $this->connection = $connection;
    }

    /**
     * @param Shop $shop
     */
    public function setShop(Shop $shop)
    {
        $this->shop = $shop;
    }

    /**
     * {@inheritdoc}
     */
    public function compress($content)
    {
        $qb = $this->connection->createQueryBuilder();
        $qb->select(
                ['js']
            )
            ->from('dne_custom_js_css')
            ->where('active = 1')
            ->andWhere('FIND_IN_SET(:shopId, shopIds)')
            ->setParameter('shopId', $this->shop->getId())
            ->orderBy('name', 'asc');

        $scripts = $qb->execute()->fetchAll(\PDO::FETCH_COLUMN);

        foreach ($scripts as $script) {
            $content .= $script . "\n";
        }

        return $this->compressor->compress($content);
    }
}
