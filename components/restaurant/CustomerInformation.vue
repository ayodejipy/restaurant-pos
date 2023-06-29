<script lang="ts" setup>
const tables = [
	{id: 1, name: "Table 1"},
	{id: 2, name: "Table 2"},
	{id: 3, name: "Table 3"},
	{id: 4, name: "Table 4"},
	{id: 5, name: "Table 5"},
]
</script>

<template>
	<section>
		<div class="flex flex-col gap-3 pb-5 border-b border-gray-300">
			<Field>
				<AtomInput type="text" placeholder="Customer Name" class="placeholder:text-gray-500" />
			</Field>
			<Field>
				<AtomTheSelect placeholder="Select Table" class="rounded-sm">
					<option v-for="table in tables" :value="table.id">{{ table.name }}</option>
				</AtomTheSelect>
			</Field>
		</div>
	</section>
</template>
