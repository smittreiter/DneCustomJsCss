<?php

namespace DneCustomJsCss\Services;

use Doctrine\DBAL\Connection;
use Shopware\Components\Theme\LessCompiler;
use Shopware\Models\Shop\Shop;

class LessCompilerDecorator implements LessCompiler
{
    /**
     * @var LessCompiler
     */
    private $compiler;

    /**
     * @var \Less_Parser
     */
    private $parser;

    /**
     * @var Connection
     */
    private $connection;

    /**
     * @var Shop
     */
    private $shop;

    /**
     * LessCompilerDecorator constructor.
     *
     * @param LessCompiler $compiler
     * @param \Less_Parser $parser
     * @param Connection   $connection
     */
    public function __construct(
        LessCompiler $compiler,
        \Less_Parser $parser,
        Connection $connection
    ) {
        $this->compiler = $compiler;
        $this->parser = $parser;
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
    public function setConfiguration(array $configuration)
    {
        $this->compiler->setConfiguration($configuration);
    }

    /**
     * {@inheritdoc}
     */
    public function setImportDirectories(array $directories)
    {
        $this->compiler->setImportDirectories($directories);
    }

    /**
     * {@inheritdoc}
     */
    public function setVariables(array $variables)
    {
        $this->compiler->setVariables($variables);
    }

    /**
     * {@inheritdoc}
     */
    public function compile($file, $url)
    {
        $this->compiler->compile($file, $url);
    }

    /**
     * {@inheritdoc}
     */
    public function get()
    {
        $qb = $this->connection->createQueryBuilder();
        $qb->select(
                ['css']
            )
            ->from('dne_custom_js_css')
            ->where('active = 1')
            ->andWhere('FIND_IN_SET(:shopId, shopIds)')
            ->setParameter('shopId', $this->shop->getId())
            ->orderBy('name', 'asc');

        $styles = $qb->execute()->fetchAll(\PDO::FETCH_COLUMN);

        foreach ($styles as $style) {
            $this->parser->parse($style);
        }

        return $this->compiler->get();
    }

    /**
     * {@inheritdoc}
     */
    public function reset()
    {
        $this->compiler->reset();
    }
}
