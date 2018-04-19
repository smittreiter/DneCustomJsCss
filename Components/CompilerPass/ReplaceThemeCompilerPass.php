<?php

namespace DneCustomJsCss\Components\CompilerPass;

use DneCustomJsCss\Services\ThemeCompiler;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class ReplaceThemeCompilerPass implements CompilerPassInterface
{
    /**
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        $container->getDefinition('theme_compiler')->setClass(ThemeCompiler::class);
    }
}
