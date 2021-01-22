<?php

namespace DneCustomJsCss\Services;

use Shopware\Components\Theme\Compiler;
use Shopware\Components\Theme\Compressor\CompressorInterface;
use Shopware\Components\Theme\LessCompiler;
use Shopware\Models\Shop\Shop;
use Shopware\Models\Shop\Template;

class ThemeCompiler extends Compiler
{
    /**
     * @var CompressorDecorator
     */
    private $compressor;

    /**
     * @var LessCompilerDecorator
     */
    private $lessCompiler;

    /**
     * ThemeCompilerDecorator constructor.
     *
     * {@inheritdoc}
     */
    public function __construct()
    {
        $args = func_get_args();

        foreach ($args as $arg) {
            if ($arg instanceof CompressorInterface) {
                $this->compressor = $arg;
            }
            if ($arg instanceof LessCompiler) {
                $this->lessCompiler = $arg;
            }
        }

        parent::__construct(...$args);
    }

    /**
     * {@inheritdoc}
     */
    public function compileJavascript($timestamp, Template $template, Shop $shop)
    {
        $this->compressor->setShop($shop);

        parent::compileJavascript($timestamp, $template, $shop);
    }

    /**
     * {@inheritdoc}
     */
    public function compileLess($timestamp, Template $template, Shop $shop)
    {
        $this->lessCompiler->setShop($shop);

        parent::compileLess($timestamp, $template, $shop);
    }
}
