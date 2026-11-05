<template>
	<DevOnly>
		<teleport to="body">
			<div class="fixed bottom-1 left-1 text-white bg-gray-900 py-1 px-1.5 text-xs leading-none rounded-md z-50 font-mono">
				<span class="xl:hidden">2xl</span>
				<span class="hidden lg:hidden! xl:inline">xl</span>
				<span class="hidden md:hidden! lg:inline">lg</span>
				<span class="hidden sm:hidden! md:inline">md</span>
				<span class="hidden sm:inline">sm</span>
			</div>
		</teleport>
	</DevOnly>
</template>
