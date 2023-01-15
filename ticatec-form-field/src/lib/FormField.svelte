<script lang="ts">

    export let direction: 'vertical' | 'horizontal' = 'horizontal';
    export let label: string = '';
    export let required: boolean = false;
    export let error: string = '';

</script>
<div class="tsui-form-field {direction}">
    <label>
        <div class="field-label">
            {#if required}
                <span class="required-indicator">*</span>
            {/if}
            <span>{label}</span>
        </div>
        <div class="field">
            <slot></slot>
        </div>
    </label>
    {#if error || error.length > 0}
        <div class="error-message">
            <span>{error}</span>
        </div>
    {/if}
</div>